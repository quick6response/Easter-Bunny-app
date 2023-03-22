export const urlService = {
  /**
   * Открыть ссылку в новом окне
   * @param url
   */
  openTab: (url: string) => {
    // Create link in memory
    const a = window.document.createElement('a');
    a.target = '_blank';
    a.href = url;

    // Dispatch fake click
    const e = window.document.createEvent('MouseEvents');
    e.initMouseEvent(
      'click',
      true,
      true,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null,
    );
    a.dispatchEvent(e);
  },
};
