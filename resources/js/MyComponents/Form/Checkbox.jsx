export default function Checkbox({ className = "", ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                "rounded-sm border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 " +
                className
            }
        />
    );
}
