export class Video {
  constructor(
    public id: string,
    public title: string,
    public length: number,
    public description: string,
    public uploadDate: Date,
    public genre: string,
    public creator: string,
    public tags?: string[],
  ) {}
}
