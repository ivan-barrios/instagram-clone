const Story = () => {
  return (
    <div className="flex w-16 flex-col">
      <div className="h-12 w-12 self-center rounded-full bg-black"></div>
      <div className="overflow-hidden text-ellipsis text-[13.5px]">
        Username
      </div>
    </div>
  );
};

const Stories = () => {
  return (
    <div className="mt-4 grid h-fit w-full grid-cols-6 gap-12 overflow-scroll bg-slate-400 text-white sm:overflow-hidden">
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
