function authenticateToken(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acesso negado. Token não fornecido." });
    }

    const tokenFinal = token.startsWith('Bearer ') ? token.slice(7) : token;

    jwt.verify(tokenFinal, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido ou expirado." });
        }

        console.log(decoded); 
        req.user = decoded;
        next();
    });
}
