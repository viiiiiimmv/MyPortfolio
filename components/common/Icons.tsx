import React from "react";

export function GithubIcon({ className = "h-5 w-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function LinkedinIcon({ className = "h-5 w-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function LeetCodeIcon({ className = "h-5 w-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .666-1.794l3.76-4.028 5.322-5.706a1.38 1.38 0 0 0-.003-1.954A1.366 1.366 0 0 0 13.483 0zm-2.88 7.283a1.391 1.391 0 0 0-1.381 1.396c0 .768.618 1.391 1.38 1.391h9.191a1.391 1.391 0 0 0 1.38-1.391 1.391 1.391 0 0 0-1.38-1.396h-9.19z" />
    </svg>
  );
}

export function TwitterIcon({ className = "h-5 w-5", size = 20 }: { className?: string; size?: number }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function ShivChauhanLogo({
  className = "h-6 w-auto",
  size,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      role="img"
      viewBox="0 0 718 792"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-label="Shiv Chauhan logo"
    >
      <title>Shiv Chauhan Logo</title>
      <path
        d="M 717 601 L 635 556 L 627 555 L 618 559 L 463 646 L 463 742 Z M 423 351 L 357 389 L 351 396 L 348 404 L 347 657 L 150 534 L 141 531 L 129 531 L 119 535 L 2 601 L 149 683 L 326 785 L 346 791 L 364 791 L 379 787 L 389 782 L 400 774 L 413 758 L 421 739 L 423 725 Z M 177 323 L 265 374 L 413 286 L 426 281 L 441 281 L 455 286 L 626 390 L 635 387 L 717 340 L 480 199 L 465 192 L 445 187 L 424 187 L 413 189 L 387 200 Z M 409 0 L 369 22 L 41 214 L 29 224 L 13 244 L 5 259 L 0 276 L 1 345 L 4 355 L 12 370 L 27 387 L 36 394 L 307 556 L 308 486 L 307 481 L 302 472 L 293 465 L 98 346 L 91 339 L 85 328 L 83 311 L 89 294 L 97 285 L 408 103 Z"
        fillRule="evenodd"
      />
    </svg>
  );
}

