

interface Boundary {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface Point {
    x: number;
    y: number;
    data?: any;
}

export class QuadTree {
    private boundary: Boundary;
    private capacity: number;
    private points: Point[];
    private divided: boolean;

    // Children
    private northeast?: QuadTree;
    private northwest?: QuadTree;
    private southeast?: QuadTree;
    private southwest?: QuadTree;

    constructor(boundary: Boundary, capacity: number) {
        this.boundary = boundary;
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    // AABB Collision Detection
    private contains(p: Point): boolean {
        return (
            p.x >= this.boundary.x - this.boundary.w &&
            p.x <= this.boundary.x + this.boundary.w &&
            p.y >= this.boundary.y - this.boundary.h &&
            p.y <= this.boundary.y + this.boundary.h
        );
    }

    private intersects(range: Boundary): boolean {
        return !(
            range.x - range.w > this.boundary.x + this.boundary.w ||
            range.x + range.w < this.boundary.x - this.boundary.w ||
            range.y - range.h > this.boundary.y + this.boundary.h ||
            range.y + range.h < this.boundary.y - this.boundary.h
        );
    }

    subdivide(): void {
        const { x, y, w, h } = this.boundary;
        const nw = { x: x - w / 2, y: y - h / 2, w: w / 2, h: h / 2 };
        const ne = { x: x + w / 2, y: y - h / 2, w: w / 2, h: h / 2 };
        const sw = { x: x - w / 2, y: y + h / 2, w: w / 2, h: h / 2 };
        const se = { x: x + w / 2, y: y + h / 2, w: w / 2, h: h / 2 };

        this.northwest = new QuadTree(nw, this.capacity);
        this.northeast = new QuadTree(ne, this.capacity);
        this.southwest = new QuadTree(sw, this.capacity);
        this.southeast = new QuadTree(se, this.capacity);

        this.divided = true;
    }

    insert(point: Point): boolean {
        if (!this.contains(point)) return false;

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        }

        if (!this.divided) this.subdivide();

        if (this.northeast!.insert(point)) return true;
        if (this.northwest!.insert(point)) return true;
        if (this.southeast!.insert(point)) return true;
        if (this.southwest!.insert(point)) return true;

        return false;
    }

    query(range: Boundary, found: Point[] = []): Point[] {
        if (!this.intersects(range)) return found;

        for (const p of this.points) {
            if (
                p.x >= range.x - range.w &&
                p.x <= range.x + range.w &&
                p.y >= range.y - range.h &&
                p.y <= range.y + range.h
            ) {
                found.push(p);
            }
        }

        if (this.divided) {
            this.northwest!.query(range, found);
            this.northeast!.query(range, found);
            this.southwest!.query(range, found);
            this.southeast!.query(range, found);
        }

        return found;
    }
}
