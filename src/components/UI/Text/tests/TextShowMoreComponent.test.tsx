import { TextShowMoreComponent } from '@components/UI/Text/TextShowMoreComponent';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

test('renders text with "Показать еще" button when text length exceeds maxCharacters', () => {
  // eslint-disable-next-line sonarjs/no-duplicate-string
  const longText = 'This is a long text that exceeds the maxCharacters limit';
  render(<TextShowMoreComponent text={longText} maxCharacters={10} />);

  expect(
    screen.getByText((content, element) => {
      return content === 'This is a ...';
    }),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(
      'This is a long text that exceeds the maxCharacters limit',
    ),
  ).toBeNull();

  const showMoreButton = screen.getByText('Показать еще');
  fireEvent.click(showMoreButton);

  expect(
    screen.getByText(
      'This is a long text that exceeds the maxCharacters limit',
    ),
  ).toBeInTheDocument();
  expect(screen.queryByText('This is a l...')).toBeNull();
});

test('everything is a node', () => {
  const Foo = () => <div>Hello</div>;
  render(<Foo />);
  expect(screen.getByText('Hello')).toBeInstanceOf(Node);
});
