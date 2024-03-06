function Status(num) {
    if (num == 0) {
        return "Pending"
    }else if (num == 1) {
        return "Accepted"
}   
    else if (num == 2) {
        return "Rejected"
    }
}

export default Status;