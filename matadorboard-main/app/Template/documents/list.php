<h2><?= t('Uploaded Documents') ?></h2>

<table class="table-striped table-bordered">
    <thead>
        <tr>
            <th><?= t('Filename') ?></th>
            <th><?= t('Description') ?></th>
            <th><?= t('Uploaded By') ?></th>
            <th><?= t('Actions') ?></th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($documents as $document): ?>
            <tr>
                <td><?= $this->text->e($document['filename']) ?></td>
                <td><?= $this->text->e($document['description']) ?></td>
                <td><?= $this->text->e($this->user->getFullname($document['user_id'])) ?></td>
                <td>
                    <a href="<?= $this->url->href('DocumentController', 'download', ['id' => $document['id']]) ?>" class="btn btn-sm btn-primary">
                        <?= t('Download') ?>
                    </a>
                </td>
            </tr>
        <?php endforeach ?>
    </tbody>
</table>
