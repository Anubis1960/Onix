import React, {useState} from 'react';

export const GeneratePasskey: React.FC = () => {
    // State
    const [length, setLength] = useState<number>(12);
    const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
    const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
    const [password, setPassword] = useState<string>('');
    const [copied, setCopied] = useState<boolean>(false);

    // Character sets
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+{}[]=<>/?.';

    // Generate password
    const generatePassword = () => {
        let chars = lowerCaseChars + upperCaseChars;
        if (includeNumbers) chars += numberChars;
        if (includeSymbols) chars += symbolChars;

        const charArray = chars.split('');
        const passwordChars: string[] = [];
        const randomValues = new Uint32Array(length);
        window.crypto.getRandomValues(randomValues);

        for (let i = 0; i < length; i++) {
            const randomIndex = randomValues[i] % charArray.length;
            passwordChars.push(charArray[randomIndex]);
        }

        setPassword(passwordChars.join(''));
    };

    // Copy to clipboard
    const copyToClipboard = () => {
        navigator.clipboard.writeText(password).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Generate Secure Password</h2>

            {/* Length Slider */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Password Length: {length}
                </label>
                <input
                    type="range"
                    min="8"
                    max="32"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
                />
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={() => setIncludeNumbers(!includeNumbers)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Include Numbers</span>
                </label>

                <label className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={() => setIncludeSymbols(!includeSymbols)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span>Include Symbols</span>
                </label>
            </div>

            {/* Generate Button */}
            <button
                onClick={generatePassword}
                className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-200"
            >
                Generate Password
            </button>

            {/* Display Password */}
            {password && (
                <div className="mt-4 p-3 bg-gray-100 rounded flex justify-between items-center">
                    <span className="font-mono">{password}</span>
                    <button
                        onClick={copyToClipboard}
                        className="ml-2 text-sm text-blue-600 hover:underline"
                    >
                        {copied ? 'Copied!' : 'Copy'}
                    </button>
                </div>
            )}
        </div>
    );
};