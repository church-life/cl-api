import { type Prisma } from '@prisma/client';

import { Seeder } from './seeder';

type Payload = Prisma.CountryCreateInput;

export class CountriesSeeder extends Seeder<Payload> {
  protected readonly data = [
    {
      name: 'Peru',
      alpha2: 'PE',
      alpha3: 'PER',
      dialCode: 51,
    },
    {
      name: 'United States',
      alpha2: 'US',
      alpha3: 'USA',
      dialCode: 1,
    },
    {
      name: 'Spain',
      alpha2: 'ES',
      alpha3: 'ESP',
      dialCode: 34,
    },
  ] satisfies Payload[];

  protected async seedLogic(country: Payload) {
    await Seeder.prismaClient.country.upsert({
      where: { alpha2: country.alpha2 },
      update: {
        name: country.name,
        alpha2: country.alpha2,
        alpha3: country.alpha3,
        dialCode: country.dialCode,
      },
      create: country,
    });
  }
}
