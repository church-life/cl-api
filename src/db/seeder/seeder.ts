/* eslint-disable @typescript-eslint/no-misused-promises */
import { PrismaClient } from '@prisma/client';
import { eachLimit } from 'async';
import { type Class } from 'type-fest';

/**
 * The class that executes and manage the seeders.
 */
export abstract class Seeder<T extends Record<string, unknown>> {
  protected static readonly prismaClient = new PrismaClient();

  protected abstract data: T[];

  /**
   * Starts the execution of the seeders with steps.
   * @param stepClasses
   */
  public static async call(stepClasses: Class<Seeder<Record<string, unknown>>>[][]) {
    try {
      await this.execute(stepClasses);
    } catch (e) {
      console.log('Error executing seeds: ', e);
    }
  }

  /**
   * Allows to run each seeder passed as parameter.
   *
   * @param stepClasses An array of seeders to run seeds
   */
  private static async execute(stepClasses: Class<Seeder<Record<string, unknown>>>[][]) {
    for (const step of stepClasses) {
      await eachLimit(step, 3, async (seeder) => {
        const concreteClass = new seeder();

        if (typeof concreteClass.seedLogic !== 'function') {
          const e = new Error(`*** Error: ${seeder.name} not implement seedLogic method.`);
          console.log(e);
          return;
        }

        try {
          await concreteClass.seed();
          await concreteClass.postSeed();
          console.log(`${seeder.name} - Completed!`);
        } catch (e) {
          console.log(`*** Error: ${seeder.name} throws an error.`, e);
        }
      });
    }

    await Seeder.prismaClient.$disconnect();
  }

  /**
   * Allows to seed the database.
   * @param element The element that will be inserted or updated in the database.
   * @protected
   */
  protected abstract seedLogic(element: T): Promise<void>;

  /**
   * Allows to execute some logic after the seed.
   */
  protected postSeed(): Promise<void> {
    return Promise.resolve(undefined);
  }

  /**
   * Allows to implement overriding in concrete class any
   * required process before to execute the seeder.
   * @returns
   */
  protected preSeedProcess(): Promise<void> {
    return Promise.resolve(undefined);
  }

  /**
   * Allows to implement the seed in the concrete class.
   */
  async seed(): Promise<void> {
    if (typeof this.preSeedProcess === 'function') {
      await this.preSeedProcess();
    }

    return eachLimit(this.data, 5, async (element) => {
      await this.seedLogic(element);
    });
  }
}
