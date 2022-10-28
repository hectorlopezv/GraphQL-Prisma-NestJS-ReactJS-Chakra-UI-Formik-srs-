import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DonationsResolver } from './donations.resolver';
import { DonationsService } from './donations.service';

@Module({
  imports: [PrismaModule],
  providers: [DonationsResolver, DonationsService],
})
export class DonationsModule {}
