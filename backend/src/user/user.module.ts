import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { AdminController } from './admin.controller';
import { UserService } from './user.service';
import { SupabaseService } from '../supabase/supabase.service';

@Module({
  controllers: [UserController, AdminController],
  providers: [UserService, SupabaseService],
})
export class UserModule {}