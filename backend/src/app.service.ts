import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

const dummy = [
  {
    title: "Airplane Turbulence: Sky's Rollercoaster",
    name: '@iamwillpursell',
    comment:
      'I really love the ecosystem Vercel is creating. The way each component can be added and modified with ease really makes these tools attractive.',
  },
  {
    title: 'How to make a chat app with React',
    name: '@HackSoft',
    comment:
      'We are more than excited to leverage all the new stuff, building better products for our clients ✨',
  },
  {
    title: 'Cooking recipe for disaster',
    name: '@greed7513',
    comment:
      'does anyone know which monospace are they using when showing code?',
  },
];

@Injectable()
export class AppService {
  constructor(private readonly dataSource: DataSource) {}

  async getData() {
    const result = await this.dataSource.query(
      'SELECT * FROM comments ORDER BY id DESC',
    );
    result.push(...dummy);
    return result;
  }

  addData(data: any) {
    // dummy.push(data);
    // console.log(data);
    const result = this.dataSource.query(
      'INSERT INTO comments (title, name, comment) VALUES ($1, $2, $3)',
      [data.title, data.name, data.comment],
    );
    return result;
  }
}
