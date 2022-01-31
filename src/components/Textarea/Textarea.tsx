import { ChangeEvent } from 'react'
import './Textarea.scss'

type Props = {
  children: React.ReactNode
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  dateToShow: string
}

const Textarea = (props: Props) => {
  return (
    <form action='#' className='note-text h-100'>
      <label htmlFor='note-text' className='note-text__label'>
        Note
      </label>
      <textarea
        name='note-text'
        id='note-text'
        className='note-text__textarea h-100'
        onChange={props.onChange}
        value={String(props.children)}
      />
      <aside className='note-text__date'>{props.dateToShow}</aside>
    </form>
  )
}

export default Textarea
