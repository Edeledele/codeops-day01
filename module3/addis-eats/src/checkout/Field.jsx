export default function Field({ label, name, value, onChange, onBlur, error, touched, ...props }) {
  const showError = touched && error

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-invalid={Boolean(showError)}
        aria-describedby={showError ? `${name}-error` : undefined}
        {...props}
      />
      {showError && (
        <span id={`${name}-error`} className="field-error">
          {error}
        </span>
      )}
    </div>
  )
}
