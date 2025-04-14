import React, { useState, useEffect } from 'react';

interface Document {
  id: number;
  file_path: string;
  status: string;
}

const DocumentList: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [role, setRole] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const backendUrl = 'http://localhost:5001'; // update for prod later

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetch(`/api/get-user-role?userId=1`);
        const data = await response.json();
        setRole(data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchRole();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch(`/api/documents?userId=1`);
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };
    fetchDocuments();
  }, []);

  const handleApprove = async (documentId: number) => {
    try {
      await fetch(`/api/documents/${documentId}/approve`, { method: 'PATCH' });
      setMessage('Document approved successfully!');
      setDocuments((prev) =>
        prev.map((doc) => doc.id === documentId ? { ...doc, status: 'Approved' } : doc)
      );
    } catch (error) {
      console.error('Error approving document:', error);
      setMessage('Error approving document');
    }
  };

  const handleReject = async (documentId: number) => {
    try {
      await fetch(`/api/documents/${documentId}/reject`, { method: 'PATCH' });
      setMessage('Document rejected successfully!');
      setDocuments((prev) =>
        prev.map((doc) => doc.id === documentId ? { ...doc, status: 'Rejected' } : doc)
      );
    } catch (error) {
      console.error('Error rejecting document:', error);
      setMessage('Error rejecting document');
    }
  };

  const handleDelete = async (documentId: number) => {
    try {
      await fetch(`/api/documents/${documentId}`, { method: 'DELETE' });
      setMessage('Document deleted successfully!');
      setDocuments((prev) => prev.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error('Error deleting document:', error);
      setMessage('Error deleting document');
    }
  };

  const getFilePreview = (filePath: string) => {
    const extension = filePath.split('.').pop()?.toLowerCase();
    const fullPath = `${backendUrl}/${filePath}`;

    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
      return <img src={fullPath} alt="Preview" width="200" />;
    }

    if (extension === 'pdf') {
      return <embed src={fullPath} width="200" height="300" type="application/pdf" />;
    }

    return <p>No preview available for this file type</p>;
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Document List</h2>
      {message && <p className="text-green-600 mb-2">{message}</p>}

      <ul className="space-y-2">
        {documents.map((doc) => (
          <li key={doc.id} className="border p-2 rounded">
            <p>File Path: {doc.file_path}</p>
            <p>Status: {doc.status}</p>

            <div className="my-4">
              {getFilePreview(doc.file_path)}
            </div>

            <div className="flex gap-2 mt-2">
              {role === 'faculty' && doc.status === 'Pending' ? (
                <>
                  <button onClick={() => handleApprove(doc.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                    Approve
                  </button>
                  <button onClick={() => handleReject(doc.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                    Reject
                  </button>
                </>
              ) : role === 'user' ? (
                <button className="bg-gray-500 text-white px-2 py-1 rounded" disabled>
                  Approve
                </button>
              ) : null}

              <button onClick={() => handleDelete(doc.id)} className="bg-red-500 text-white px-2 py-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentList;
