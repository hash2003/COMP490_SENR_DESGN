<div class="page-header">
    <h2><?= t('Received Documents') ?></h2>
</div>

<?php if (empty($documents)): ?>
    <p class="alert"><?= t('You have not received any documents yet.') ?></p>
<?php else: ?>
    <table class="table-striped">
        <thead>
            <tr>
                <th><?= t('File Name') ?></th>
                <th><?= t('Description') ?></th>
                <th><?= t('Sent By') ?></th>
                <th><?= t('Received At') ?></th>
                <th><?= t('Actions') ?></th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($documents as $document): ?>
                <tr>
                    <td><?= $this->text->e($document['file_name']) ?></td>
                    <td><?= $this->text->e($document['description']) ?></td>
                    <td><?= $this->text->e($document['sender_name']) ?></td>
                    <td><?= date('Y-m-d H:i:s', $document['received_at']) ?></td>
                    <td>
                        <a href="<?= $this->url->href('DocumentController', 'download', ['id' => $document['id']]) ?>" class="btn btn-success">
                            <i class="fa fa-download"></i> <?= t('Download') ?>
                        </a>
                        <a href="<?= $this->url->href('DocumentController', 'deleteReceived', ['id' => $document['id']]) ?>" class="btn btn-danger">
                            <i class="fa fa-trash"></i> <?= t('Remove') ?>
                        </a>
                    </td>
                </tr>
            <?php endforeach ?>
        </tbody>
    </table>
<?php endif; ?>
