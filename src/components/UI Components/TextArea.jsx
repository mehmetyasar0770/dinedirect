const TextArea = ({ label, value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-2">{label}:</label>
      <textarea
        className="w-full p-2 border rounded"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
  export default TextArea;