/* eslint-disable no-console, no-await-in-loop */
import chalk from 'chalk'
import { AppDataSource } from '../typeorm.data-source'
import { getSeeders } from '../database/helpers/seeders'

const run = async () => {

    const { manager } = await AppDataSource.initialize()
    const queryRunner = manager.connection.createQueryRunner()

    const seeders = await getSeeders()

    for (const seeder of seeders) {
        console.log(`${chalk.green('up')} ${seeder.name ?? ''}`)
        await seeder.up(queryRunner)
    }

    return AppDataSource.destroy()
}

void run()