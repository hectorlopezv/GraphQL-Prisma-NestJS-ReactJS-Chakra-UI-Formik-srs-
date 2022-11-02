import { Injectable } from '@nestjs/common';
import { DonationCreateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { DonationWhereUniqueInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-where-unique.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DonationsService {
  constructor(private readonly prisma: PrismaService) {}
  create(createDonationInput: DonationCreateInput) {
    console.log('createDonationInput', createDonationInput);
    return this.prisma.donation.create({ data: createDonationInput });
  }
  async getTotal() {
    const res = await this.prisma.donation.aggregate({ _sum: { count: true } });
    return res._sum.count;
  }
  findAll(orderBy?: { field?: string; direction?: string }) {
    const { field = 'createdAt', direction = 'desc' } = orderBy || {};

    return this.prisma.donation.findMany({ orderBy: { [field]: direction } });
  }

  findOne(donationWhereUniqueInput: DonationWhereUniqueInput) {
    return this.prisma.donation.findUnique({
      where: { ...donationWhereUniqueInput },
    });
  }
}
