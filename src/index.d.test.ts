// tslint:disable no-console

import { Config, createForm, AnyObject, Mutator, FieldState } from './index'

const onSubmit: Config['onSubmit'] = (values, form, callback) => {}

let form = createForm<AnyObject>({
  initialValues: { foo: 'bar' },
  onSubmit: (values, form, callback) => {}
})
let formState = form.getState()

type FormData = {
  foo: string
  bar: number
}

let formWithShape = createForm<FormData>({
  onSubmit(formData) {
    console.log(formData.foo as string)
    console.log(formData.bar as number)
  }
})

formWithShape.change('foo', '2')
formWithShape.change('bar', 2)

console.log(
  formWithShape.getFieldState('foo')!.value as string,
  formWithShape.getFieldState('foo') as FieldState<string>,
  formWithShape.getFieldState('foo') as undefined
)
console.log(
  formWithShape.getFieldState('bar')!.value as number,
  formWithShape.getFieldState('bar') as FieldState<number>,
  formWithShape.getFieldState('foo') as undefined
)

formWithShape.subscribe(
  v => {
    v.values.bar
  },
  { values: true }
)

console.log(formState.active as string, formState.active as undefined)
console.log(formState.dirty as boolean)
console.log(formState.dirtyFields as AnyObject, formState.dirtyFields)
console.log(formState.dirtySinceLastSubmit as boolean)
console.log(
  formState.error.foo,
  formState.error as string,
  formState.error as boolean
)
console.log(formState.errors as AnyObject, formState.errors.foo)
console.log(formState.initialValues as AnyObject, formState.initialValues.foo)
console.log(formState.invalid as boolean)
console.log(formState.pristine as boolean)
console.log(
  formState.submitError as string,
  formState.submitError as object,
  formState.submitError as undefined
)
console.log(formState.submitErrors as AnyObject, formState.submitErrors.foo)
console.log(formState.submitFailed as boolean)
console.log(formState.submitSucceeded as boolean)
console.log(formState.submitSucceeded as boolean)
console.log(formState.submitting as boolean)
console.log(formState.valid as boolean)
console.log(formState.validating as boolean)
console.log(formState.values as AnyObject, formState.values.foo)

const initialValues: Config['initialValues'] = {
  a: 'a',
  b: true,
  c: 1
}

form = createForm({ onSubmit, initialValues })
formState = form.getState()
console.log(formState.pristine as boolean)
console.log(formState.dirty as boolean)

// subscription
form = createForm({ onSubmit, initialValues })
form.subscribe(
  state => {
    // noop
  },
  { pristine: true }
)

// mutators
const setValue: Mutator = ([name, newValue], state, { changeValue }) => {
  changeValue(state, name, value => newValue)
}

type Mutators = { setValue: (name: string, value: string) => void }
form = createForm({
  mutators: { setValue },
  onSubmit
})

// Get form.mutators cast to Mutators
const mutators: Mutators = form.mutators as Mutators
mutators.setValue('firstName', 'Kevin')
