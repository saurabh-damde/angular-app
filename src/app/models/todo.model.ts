export class Todo {
  constructor(
    public sr: number = 0,
    public title: string,
    public desc: string,
    public active: boolean = true
  ) {}
}
