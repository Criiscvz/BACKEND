import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../src/usuario/usuario.service';
import { AuthService } from '../src/auth/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Usuario } from '../src/usuario/entities/usuario.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

/**
 * Test Manual: Verificar Hash de Contraseñas
 * 
 * Este test verifica que:
 * 1. El método hashPassword() genera hashes bcrypt correctos
 * 2. El método createUsuarioWithHashedPassword() hashea antes de guardar
 * 3. Registro y Admin usan el mismo método de hashing
 */

describe('Hash de Contraseñas - Test Manual', () => {
  let usuarioService: UsuarioService;
  let authService: AuthService;

  // Mock del repositorio
  const mockUsuarioRepository = {
    save: jest.fn((user) => Promise.resolve({ ...user, usuarioId: 1 })),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn((payload) => Promise.resolve('mock-token')),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        AuthService,
        {
          provide: getRepositoryToken(Usuario),
          useValue: mockUsuarioRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    usuarioService = module.get<UsuarioService>(UsuarioService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('UsuarioService - hashPassword()', () => {
    it('debe generar un hash bcrypt válido', async () => {
      const password = 'MiPassword123';
      const hash = await usuarioService.hashPassword(password);

      // Verificar que el hash empieza con $2b$ (bcrypt)
      expect(hash).toMatch(/^\$2b\$/);
      
      // Verificar que tiene el formato correcto (60 caracteres)
      expect(hash.length).toBe(60);

      // Verificar que el hash puede validarse con bcrypt
      const isValid = await bcryptjs.compare(password, hash);
      expect(isValid).toBe(true);
    });

    it('debe generar hashes diferentes para la misma contraseña (salt aleatorio)', async () => {
      const password = 'MiPassword123';
      const hash1 = await usuarioService.hashPassword(password);
      const hash2 = await usuarioService.hashPassword(password);

      // Los hashes deben ser diferentes (salt aleatorio)
      expect(hash1).not.toBe(hash2);

      // Pero ambos deben validar correctamente
      expect(await bcryptjs.compare(password, hash1)).toBe(true);
      expect(await bcryptjs.compare(password, hash2)).toBe(true);
    });

    it('debe usar 10 rounds (verificar en el hash)', async () => {
      const password = 'MiPassword123';
      const hash = await usuarioService.hashPassword(password);

      // El hash debe contener "$2b$10$" (10 rounds)
      expect(hash).toMatch(/^\$2b\$10\$/);
    });
  });

  describe('UsuarioService - createUsuarioWithHashedPassword()', () => {
    it('debe hashear la contraseña antes de guardar', async () => {
      const plainPassword = 'MiPassword123';
      const userData = {
        nombre: 'Juan',
        apellido: 'Pérez',
        correoElectronico: 'juan@test.com',
        contrasenaFriada: plainPassword,
        telefono: '1234567890',
        rolId: 1,
        usuarioCreaId: 1,
      };

      await usuarioService.createUsuarioWithHashedPassword(userData);

      // Verificar que se llamó a save()
      expect(mockUsuarioRepository.save).toHaveBeenCalledTimes(1);

      // Obtener los datos que se pasaron a save()
      const savedData = mockUsuarioRepository.save.mock.calls[0][0];

      // Verificar que la contraseña NO es texto plano
      expect(savedData.contrasenaFriada).not.toBe(plainPassword);

      // Verificar que es un hash bcrypt
      expect(savedData.contrasenaFriada).toMatch(/^\$2b\$10\$/);

      // Verificar que el hash es válido
      const isValid = await bcryptjs.compare(plainPassword, savedData.contrasenaFriada);
      expect(isValid).toBe(true);
    });
  });

  describe('AuthService - register()', () => {
    it('debe usar el método centralizado de hashing', async () => {
      mockUsuarioRepository.findOneBy.mockResolvedValue(null); // No existe usuario

      const registerData = {
        nombre: 'María',
        apellido: 'García',
        correoElectronico: 'maria@test.com',
        contrasenaFriada: 'Password456',
        telefono: '0987654321',
        usuarioCreaId: 1,
      };

      const result = await authService.register(registerData);

      // Verificar que se llamó al método de guardado
      expect(mockUsuarioRepository.save).toHaveBeenCalledTimes(1);

      // Verificar los datos guardados
      const savedData = mockUsuarioRepository.save.mock.calls[0][0];
      expect(savedData.contrasenaFriada).toMatch(/^\$2b\$10\$/);
      expect(savedData.contrasenaFriada).not.toBe('Password456');
    });
  });

  describe('Consistencia entre Registro y Admin', () => {
    it('registro y admin deben generar el mismo tipo de hash', async () => {
      mockUsuarioRepository.findOneBy.mockResolvedValue(null);

      const password = 'TestPassword789';

      // Simular registro normal
      const registerData = {
        nombre: 'Usuario1',
        apellido: 'Test',
        correoElectronico: 'user1@test.com',
        contrasenaFriada: password,
        usuarioCreaId: 1,
      };

      await authService.register(registerData);
      const hashFromRegister = mockUsuarioRepository.save.mock.calls[0][0].contrasenaFriada;

      // Limpiar mock
      mockUsuarioRepository.save.mockClear();

      // Simular creación desde admin
      const adminData = {
        nombre: 'Usuario2',
        apellido: 'Test',
        correoElectronico: 'user2@test.com',
        contrasenaFriada: password,
        rolId: 2,
        usuarioCreaId: 1,
      };

      await usuarioService.createUsuarioWithHashedPassword(adminData);
      const hashFromAdmin = mockUsuarioRepository.save.mock.calls[0][0].contrasenaFriada;

      // Ambos deben ser hashes bcrypt válidos
      expect(hashFromRegister).toMatch(/^\$2b\$10\$/);
      expect(hashFromAdmin).toMatch(/^\$2b\$10\$/);

      // Ambos deben validar correctamente con la contraseña original
      expect(await bcryptjs.compare(password, hashFromRegister)).toBe(true);
      expect(await bcryptjs.compare(password, hashFromAdmin)).toBe(true);

      // Los hashes serán diferentes (salt aleatorio), pero ambos válidos
      expect(hashFromRegister).not.toBe(hashFromAdmin); // Salt diferente
    });
  });
});

/**
 * INSTRUCCIONES PARA EJECUTAR:
 * 
 * 1. Instalar dependencias de testing (si no están):
 *    npm install --save-dev @nestjs/testing jest @types/jest
 * 
 * 2. Guardar este archivo como: test/usuario-hash.spec.ts
 * 
 * 3. Ejecutar el test:
 *    npm test -- usuario-hash.spec.ts
 * 
 * 4. Verificar que todos los tests pasen ✅
 */
