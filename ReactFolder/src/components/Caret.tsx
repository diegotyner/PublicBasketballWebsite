
interface CaretProps {
  direction?: 'asc' | 'desc';
}
const Caret = ({direction}: CaretProps) => {
  return (
      <svg className={direction} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#d4d4d4" strokeWidth="0.00024000000000000003"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.1018 8C5.02785 8 4.45387 9.2649 5.16108 10.0731L10.6829 16.3838C11.3801 17.1806 12.6197 17.1806 13.3169 16.3838L18.8388 10.0731C19.5459 9.2649 18.972 8 17.898 8H6.1018Z" fill="#ffffff"></path> </g></svg>
  )
}

export default Caret