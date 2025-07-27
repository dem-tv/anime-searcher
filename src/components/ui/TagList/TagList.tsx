type Props = {
  list: string[];
};

export function TagList(props: Props) {
  const renderTagList = props.list.map((item) => (
    <li
      className={
        'rounded-md text-white backdrop-blur-sm relative overflow-hidden border after:absolute after:inset-0 after:bg-[#00000080] after:-z-10 text-sm px-2'
      }
      key={item}
    >
      {item}
    </li>
  ));

  return <ul className={'flex flex-wrap gap-2'}>{renderTagList}</ul>;
}
