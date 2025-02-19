<?php

namespace Kanboard\Controller;

/**
 * Document Controller
 */
class DocumentController extends BaseController
{
    /**
     * Display the document upload form
     */
    public function upload()
    {
        $users = $this->db->table('users')->columns('id', 'username')->findAll();
    
        $this->response->html($this->helper->layout->project('documents/upload', [
            'title' => t('Upload Document'),
            'project' => $this->getProject(),
            'users' => $users, // ✅ Pass users to the upload form
        ]));
    }
    

    /**
     * Handle file upload and save to the database
     */
    public function save()
{
    $project = $this->getProject();
    $user_id = $this->userSession->getId();
    $recipient_id = $this->request->getIntegerParam('recipient_user_id');

    if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
        $this->flash->failure(t('Failed to upload file.'));
        return $this->redirect($this->helper->url->to('DocumentController', 'upload', ['project_id' => $project['id']]));
    }

    $file = $_FILES['file'];
    $filename = time() . '_' . basename($file['name']);
    $uploadDir = DATA_DIR . DIRECTORY_SEPARATOR . 'uploads';

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    if (!move_uploaded_file($file['tmp_name'], $uploadDir . DIRECTORY_SEPARATOR . $filename)) {
        $this->flash->failure(t('Error moving uploaded file.'));
        return $this->redirect($this->helper->url->to('DocumentController', 'upload', ['project_id' => $project['id']]));
    }

    // Store file in "documents" table
    $this->db->table('documents')->insert([
        'project_id' => $project['id'],
        'user_id' => $user_id,
        'filename' => $filename,
        'description' => $this->request->getStringParam('description'),
        'created_at' => time(),
    ]);

    // If recipient is selected, store in "sent_documents" table
    if ($recipient_id) {
        $this->db->table('sent_documents')->insert([
            'sender_id' => $user_id,
            'receiver_id' => $recipient_id,
            'filename' => $filename,
            'description' => $this->request->getStringParam('description'),
            'sent_at' => time(),
        ]);
    }

    $this->flash->success(t('File uploaded successfully.'));
    return $this->redirect($this->helper->url->to('DocumentController', 'list', ['project_id' => $project['id']]));
}


    /**
     * Handle sending a document to another user
     */
    public function send()
    {
        $sender_id = $this->userSession->getId();
        $receiver_id = $this->request->getIntegerParam('receiver_id');

        if (!$receiver_id) {
            $this->flash->failure(t('Invalid recipient.'));
            return $this->redirect($this->helper->url->to('DocumentController', 'sendForm'));
        }

        if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
            $this->flash->failure(t('Failed to upload file.'));
            return $this->redirect($this->helper->url->to('DocumentController', 'sendForm'));
        }

        $file = $_FILES['file'];
        $filename = time() . '_' . basename($file['name']);
        $uploadDir = DATA_DIR . DIRECTORY_SEPARATOR . 'uploads';

        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        if (!move_uploaded_file($file['tmp_name'], $uploadDir . DIRECTORY_SEPARATOR . $filename)) {
            $this->flash->failure(t('Error moving uploaded file.'));
            return $this->redirect($this->helper->url->to('DocumentController', 'sendForm'));
        }

        $this->db->table('sent_documents')->insert([
            'sender_id' => $sender_id,
            'receiver_id' => $receiver_id,
            'filename' => $filename,
            'description' => $this->request->getStringParam('description'),
            'sent_at' => time(),
        ]);

        $this->flash->success(t('Document sent successfully.'));
        return $this->redirect($this->helper->url->to('DocumentController', 'sent'));
    }

    /**
     * List sent documents
     */
    public function sent()
    {
        $user_id = $this->userSession->getId();
        $documents = $this->db->table('sent_documents')->eq('sender_id', $user_id)->findAll();

        $this->response->html($this->helper->layout->project('documents/sent', [
            'title' => t('Sent Documents'),
            'documents' => $documents,
        ]));
    }

    /**
     * List received documents
     */
    public function received()
    {
        $user_id = $this->userSession->getId();
        $documents = $this->db->table('sent_documents')->eq('receiver_id', $user_id)->findAll();

        $this->response->html($this->helper->layout->project('documents/received', [
            'title' => t('Received Documents'),
            'documents' => $documents,
        ]));
    }

    /**
     * Download a document
     */
    public function download()
    {
        $document_id = $this->request->getIntegerParam('id');
        $document = $this->db->table('sent_documents')->eq('id', $document_id)->findOne();

        if (!$document) {
            $this->flash->failure(t('File not found.'));
            return $this->redirect($this->helper->url->to('DocumentController', 'received'));
        }

        $filePath = DATA_DIR . DIRECTORY_SEPARATOR . 'uploads' . DIRECTORY_SEPARATOR . $document['filename'];

        if (!file_exists($filePath)) {
            $this->flash->failure(t('File does not exist.'));
            return $this->redirect($this->helper->url->to('DocumentController', 'received'));
        }

        $this->response->withFileDownload($filePath, $document['filename']);
    }
}
