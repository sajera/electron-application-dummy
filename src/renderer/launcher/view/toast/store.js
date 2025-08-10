// outsource dependencies
import { makeAutoObservable } from 'mobx'
import { FaceSmileIcon } from '@heroicons/react/24/outline'
// local dependencies
import toast from '../../../component/toast'
import { ToastPageLS } from '../../local-storage'
import { FormData } from '../../../component/form'

const initial = {
  header: 'Greetings',
  body: 'Hello world!',
  iconClassName: 'text-green-600',
  headerClassName: 'text-green-800 dark:text-green-500',
}

class ToastPageStore {
  data = null

  constructor () {
    this.form = new FormData(initial, this.validate, this.submit)
    makeAutoObservable(this)
  }

  initialize = () => {
    // NOTE allows switch to "Color Pallet" and back without losing form data
    ToastPageLS.get() && (this.form.value = ToastPageLS.get())
    // NOTE each initialization replace initial values
    // ToastPageLS.get() && this.form.initialize(ToastPageLS.get())
    return () => ToastPageLS.set(this.form.value)
  }

  submit = data => toast.pushToast({ icon: FaceSmileIcon, ...data })

  validate = values => {
    const errors = {}

    // TODO icon select
    // if (!values.icon) {
    //   errors.icon = 'The Icon is mandatory.'
    // }
    // NOTE from UI view test purpose
    // if (!values.header) {
    //   errors.header = 'The header is mandatory.'
    // }

    // console.log(`%c validate `, 'color: #FF6766; font-weight: bolder;'
    //   , '\n values:', values
    //   , '\n errors:', errors
    // )

    return errors
  }
}

export const toastPageStore = new ToastPageStore()
export default toastPageStore
