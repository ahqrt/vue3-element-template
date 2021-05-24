import { h, defineComponent } from 'vue'
import style from './item.module.scss'
export default defineComponent({
  name: 'MenuItem',
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const { icon, title } = props
    return () => (
      <div>
        {icon.includes('el-icon') ? <i class={[icon, style.subElIcon]} /> : <svg-icon icon-class={icon} />}
        {title ? <span>{title}</span> : ''}
      </div>
    )
  },
})
