import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDonationInput } from './dto/create-donation.input';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDonationInput: CreateDonationInput) {
    return 'This action adds a new donation';
  }

  findAll() {
    console.log(
      'this.prisma.donation.findMany()',
      this.prisma.donation.findMany(),
    );
    return this.prisma.donation.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} donation`;
  }
}
