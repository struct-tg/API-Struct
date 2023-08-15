export function getUserIdByToken(req: any){
    const id: number = req.user.id
    return id;
} 