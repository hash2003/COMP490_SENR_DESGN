<form action="<?= $this->url->href('DocumentController', 'save', ['project_id' => $project['id'] ?? 0]) ?>" method="post" enctype="multipart/form-data">
    <?= $this->form->csrf() ?>

    <div class="form-group">
        <label for="file"><?= t('Upload Document') ?></label>
        <input type="file" name="file" class="form-control" required>
    </div>

    <div class="form-group">
        <label for="description"><?= t('Description') ?></label>
        <input type="text" name="description" class="form-control" placeholder="<?= t('Enter a short description') ?>">
    </div>

    <div class="form-group">
        <label for="recipient_user_id"><?= t('Send to User (Optional)') ?></label>
        <select name="recipient_user_id" class="form-control">
            <option value=""><?= t('Select a user (optional)') ?></option>
            <?php foreach ($users as $user): ?>
                <option value="<?= $user['id'] ?>"><?= $this->text->e($user['username']) ?></option>
            <?php endforeach; ?>
        </select>
    </div>

    <button type="submit" class="btn btn-primary"><?= t('Upload & Send') ?></button>
</form>
