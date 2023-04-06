export interface ReportSendInterface {
  type: 'walls' | 'photos';
  id: string | number;
}

// что нужно прописать, чтобы получить только 'walls' | 'photos'
const send = (type: ReportSendInterface) => {
  // 'walls', 'photos'
};
