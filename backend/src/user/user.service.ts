import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, role = 'user' } = registerUserDto;
    const supabase = this.supabaseService.getClient();

    try {
      const { count, error: countError } = await supabase
        .from('users')
        .select('id', { count: 'exact', head: true })
        .eq('email', email);

      if (countError) {
        console.error('Database check error:', countError);
        throw new InternalServerErrorException('Failed to check existing user');
      }

      if ((count ?? 0) > 0) {
        throw new ConflictException('Email already exists');
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const { data, error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword, role }])
        .select('id, email, role, created_at')
        .single();

      if (error) {
        if (error.code === '23505') {
          throw new ConflictException('Email already exists');
        }
        console.error('Insert error:', error);
        throw new InternalServerErrorException('Failed to create user');
      }

      return {
        message: 'User registered successfully',
        user: data,
      };
    } catch (error) {
      if (error instanceof ConflictException || error instanceof InternalServerErrorException) {
        throw error;
      }
      console.error('Unexpected error:', error);
      throw new InternalServerErrorException('An error occurred during registration');
    }
  }

  async getAllUsers() {
    const supabase = this.supabaseService.getClient();

    try {
      const { data: users, error } = await supabase
        .from('users')
        .select('id, email, role, created_at')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch users error:', error);
        throw new InternalServerErrorException('Failed to fetch users');
      }

      return users;
    } catch (error) {
      console.error('Get all users error:', error);
      throw new InternalServerErrorException('Failed to fetch users');
    }
  }
}