export interface SlidesModel {
  media: {
    blob: string;
    type: 'image' | 'gif' | 'video';
  };
  title: string;
  subtitle: string;
}
