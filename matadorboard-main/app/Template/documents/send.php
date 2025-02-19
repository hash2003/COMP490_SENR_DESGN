<form action="<?= $this->url->href('DocumentController', 'send') ?>" method="post" enctype="multipart/form-data">
    <?= $this->form->csrf() ?>

    <div class="form-group">
        <label for="receiver_id"><?= t('Select User to Send Document') ?></label>
        <select name="receiver_id" class="form-control" required>
            <option value=""><?= t('Choose a user') ?></option>
            <?php foreach ($users as $user): ?>
                <option value="<?= $user['id'] ?>"><?= $this->text->e($user['name']) ?></option>
            <?php endforeach ?>
        </select>
    </div>

    <div class="form-group">
        <label for="file"><?= t('Upload Document') ?></label>
        <input type="file" name="file" class="form-control" required>
    </div>

    <div class="form-group">
        <label for="description"><?= t('Description') ?></label>
        <input type="text" name="description" class="form-control" placeholder="<?= t('Enter a short description') ?>">
    </div>

    <button type="submit" class="btn btn-success"><?= t('Send Document') ?></button>
</form>
