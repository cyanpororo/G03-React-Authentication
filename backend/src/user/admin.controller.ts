import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserService } from './user.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private readonly userService: UserService) {}

  @Get('dashboard')
  @Roles('admin')
  getAdminDashboard() {
    return { message: 'Welcome to admin dashboard' };
  }

  @Get('users')
  @Roles('admin', 'moderator')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}