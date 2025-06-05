module.exports = {
    apps: [{
        name: "siap",
        script: "./dist/main.js",   // Punto de entrada de tu app
        instances: "max",        // Usa todos los núcleos del CPU
        autorestart: true,       // Reinicia si falla
        watch: false,            // Desactiva el watch en producción
        max_memory_restart: "2G", // Reinicia si usa más de 1GB RAM
        wait_ready: true, // ← Nuevo: Espera señal "ready"
        listen_timeout: 10000, // ← Aumenta timeout a 10s
        env: {
            NODE_ENV: "production",
            PORT: 3000
        }
    }]
};
