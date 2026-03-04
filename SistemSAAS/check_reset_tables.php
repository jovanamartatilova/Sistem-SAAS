<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=saas_magang;charset=utf8mb4', 'root', '');
} catch (Exception $e) {
    echo "CONN ERROR: " . $e->getMessage();
    exit(1);
}
$tables = ['password_reset_tokens', 'password_resets'];
foreach ($tables as $t) {
    echo "TABLE: $t\n";
    try {
        $stmt = $pdo->query("SELECT email, token, created_at FROM `$t`");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (!$rows) {
            echo "  (empty)\n";
        } else {
            foreach ($rows as $r) {
                echo "  " . ($r['email'] ?? '<no email>') . " | " . ($r['token'] ?? '<no token>') . " | " . ($r['created_at'] ?? '<no created_at>') . "\n";
            }
        }
    } catch (Exception $e) {
        echo "  ERROR: " . $e->getMessage() . "\n";
    }
}
