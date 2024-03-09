import { CountriesSeeder } from './countries.seeder';
import { Seeder } from './seeder';

// can be parallelized
const seedersToRun = [[CountriesSeeder]];

Seeder.call(seedersToRun).catch(console.error);
