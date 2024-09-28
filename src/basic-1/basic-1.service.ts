import { Injectable } from '@nestjs/common';

export type GreetServiceInput = {
  name: string;
};

@Injectable()
export class GreetService {
  call(input: GreetServiceInput) {
    return `Hello ${input.name}` as const;
  }
}

export type GreetServiceOutput = Awaited<ReturnType<GreetService['call']>>;
