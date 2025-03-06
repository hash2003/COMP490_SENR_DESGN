const API_BASE_URL = "http://localhost:5001"; // Adjust this if using a different backend URL

// Fetch documents for a user
export async function getDocuments(userId: number) {
  const response = await fetch(`${API_BASE_URL}/documents?userId=${userId}`);
  return response.json();
}

// Upload a document
export async function uploadDocument(formData: FormData) {
  const response = await fetch(`${API_BASE_URL}/upload`, {
    method: "POST",
    body: formData,
  });

  return response.json();
}

// Update document status (Approve, Reject, Forward)
export async function updateDocumentStatus(docId: number, status: string, senderId: number, recipientId?: number) {
  const response = await fetch(`${API_BASE_URL}/update-status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ docId, status, senderId, recipientId }),
  });

  return response.json();
}
