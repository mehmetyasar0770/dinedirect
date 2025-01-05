const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}:</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full p-2 border rounded"
        placeholder={placeholder}
      />
    </div>
  );
  
  export default InputField;
  