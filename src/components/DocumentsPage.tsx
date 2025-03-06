import { useEffect, useState } from "react";
import { getDocuments, uploadDocument, sendDocumentToUser } from "../api";

function DocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");

  useEffect(() => {
    getDocuments(1).then(setDocuments); // Replace `1` with actual user ID
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file || !recipientEmail) {
      alert("Please select a file and enter a recipient email.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    formData.append("uploadedBy", "1"); // Replace with actual user ID
    formData.append("recipientEmail", recipientEmail);

    const response = await uploadDocument(formData);

    if (response.success) {
      alert("Document uploaded and sent successfully!");
      setDocuments([...documents, { id: response.documentId, title, file_url: response.fileUrl, status: "Pending" }]);
      setFile(null);
      setTitle("");
      setRecipientEmail("");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-red-600 mb-4">Documents</h1>
      <p className="text-center text-gray-600 mb-6">Upload and send documents for approval.</p>

      {/* Drag-and-Drop Upload Box */}
      <div
        className="border-dashed border-2 border-gray-400 p-6 text-center cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <p className="text-gray-500">Drag & Drop your file here</p>
        <input type="file" onChange={handleFileChange} className="mt-2" />
      </div>

      {/* Email Input & Upload Button */}
      <form onSubmit={handleUpload} className="mt-4">
        <input
          type="text"
          placeholder="Document Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="email"
          placeholder="Recipient's CSUN Email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">
          Upload & Send
        </button>
      </form>

      {/* Pending Documents */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mt-6">
        <h2 className="text-xl font-bold text-center mb-4">Pending Documents</h2>
        <ul className="space-y-4">
          {documents.length === 0 ? (
            <p className="text-center text-gray-600">No pending documents.</p>
          ) : (
            documents.map((doc) => (
              <li key={doc.id} className="p-4 border rounded shadow bg-white">
                <strong>{doc.title}</strong> - {doc.status} <br />
                {doc.file_url && (
                  <a
                    href={`http://localhost:5001${doc.file_url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View File
                  </a>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default DocumentsPage;
