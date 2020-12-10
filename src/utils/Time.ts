class Time {
  public static msToDate(ms: number): string {
    const _ms = ms / 10000000000 < 1 ? ms * 1000 : ms;
    const date = new Date(_ms).toISOString();
    return date;
  }
}

export { Time };
