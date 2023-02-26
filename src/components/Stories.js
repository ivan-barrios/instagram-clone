const Story = () => {
  return (
    <div className="flex w-14 flex-col">
      <div className="h-10 w-10 self-center rounded-full bg-black"></div>
      <div className="overflow-hidden text-ellipsis text-xs">Username</div>
    </div>
  );
};

const Stories = () => {
  return (
    <div className="grid h-fit w-full grid-cols-6 gap-4 bg-slate-400 text-white">
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
      <Story />
    </div>
  );
};

export default Stories;
