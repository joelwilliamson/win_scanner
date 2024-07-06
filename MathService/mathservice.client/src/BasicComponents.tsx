

export function TextBox({ name, value, onChange }: { name: string, value: string, onChange: (_: string) => void }) {
    return (<input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChange(evt.target.value)}
    />);
}

export function CheckBox({ name, value, onChange }: { name: string, value: boolean, onChange: (_: boolean) => void }) {
    return (<input
        type='checkbox'
        name={name}
        id={name}
        value={value ? "true" : "false"}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => onChange(evt.target.checked)}
    />);
}

export function RadioButton<T>({ name, values, nameFn, onChange }: { name: string, values: T[], nameFn: (_: T) => string, onChange: (_: T) => void }) {
    nameFn = nameFn ?? ((val) => val.toString());
    return (<form>
        <div>
            {values.map(value => {
                const valueName = nameFn(value);
                return (<div key={value}>
                    <input type='radio' id={valueName} name={name} value={valueName} onClick={() => onChange(value)} />
                    <label htmlFor={valueName}>{valueName}</label>
                </div>);
            })}
        </div>
    </form>);
}