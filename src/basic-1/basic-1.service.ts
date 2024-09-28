import { Injectable } from '@nestjs/common';
import { random, sleep } from 'src/app.util';

export type GreetServiceInput = {
  name: string;
};

@Injectable()
export class GreetService {
  async call(input: GreetServiceInput) {
    await sleep(random(5, 10) * 1000);
    return `Hello ${input.name}` as const;
  }
}

export type GreetServiceOutput = Awaited<ReturnType<GreetService['call']>>;
