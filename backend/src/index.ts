// index.ts
// Sanity check for repository initialization

interface Message {
  content: string,
  times: number,
}

function repeatHello(message: Message): void {
  const { content, times } = message;
  for (let i = 0; i < times; i++)
    console.log(content);
}

repeatHello({
  content: "hello world",
  times: 5,
});

// Required for TS to treat this file as a module
// Prevents 'cannot redeclare block-scoped variable' errors
export { };

