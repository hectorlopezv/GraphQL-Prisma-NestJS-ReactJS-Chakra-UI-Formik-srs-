import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { DonationCreateInput } from 'src/@generated/prisma-nestjs-graphql/donation/donation-create.input';
import { DonationsService } from './donations.service';

const pubSub = new PubSub();

@Resolver('Donation')
export class DonationsResolver {
  constructor(private readonly donationsService: DonationsService) {}

  @Mutation('createDonation')
  async create(
    @Args('createDonationInput')
    createDonationInput: DonationCreateInput,
  ) {
    const created = await this.donationsService.create(createDonationInput);
    const total = await this.donationsService.getTotal();
    pubSub.publish('totalDonations', { totalUpdated: total });
    return created;
  }

  @Subscription()
  totalUpdated() {
    return pubSub.asyncIterator('totalUpdated');
  }

  @Query('donations')
  findAll(@Args('orderBy') orderBy?: { field?: string; direction?: string }) {
    return this.donationsService.findAll(orderBy);
  }

  @Query('totalDonations')
  totalDonations() {
    return this.donationsService.getTotal();
  }

  @Query('donation')
  findOne(@Args('id') id: number) {
    return this.donationsService.findOne({ id });
  }
}
